const ac = require('atlassian-connect-express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const axios = require('axios');
const https = require('https');
const { promisify } = require('util');
const request = require('request');

const getBoardColumns = async (httpClient, boardId) => {
    try {
        const { body } = await httpClient.get(`/rest/agile/1.0/board/${boardId}/configuration`);
        const result = JSON.parse(body);
        return (result && result.columnConfig && result.columnConfig.columns) || [];
    } catch (err) {
        console.error(err);
    }
};

const fields = ['status', 'priority', 'issuetype', 'summary', 'assignee'];

const getBoardIssues = async (httpClient, boardId) => {
    try {
        const { body } = await httpClient.get(
            `/rest/agile/1.0/board/${boardId}/issue?fields=${fields.join(',')}&jql=sprint in openSprints()`
        );
        const result = JSON.parse(body);
        return (result && result.issues) || [];
    } catch (err) {
        console.error(err);
    }
};

const createBoard = (columns, issues) => {
    try {
        const board = columns.map(column => ({
            name: column.name,
            statuses: column.statuses.map(status => status.id),
            issues: []
        }));
        issues.forEach(issue => {
            const statusId = issue.fields && issue.fields.status && issue.fields.status.id;
            const matchingColumn = board.find(column => column.statuses.includes(statusId));
            matchingColumn.issues.push(issue);
        });
        return {
            sprintGoal: 'Virtual stand-ups!',
            columns: board
        };
    } catch (err) {
        console.log(err);
    }
};

module.exports = app => {
    const addon = ac(app);

    const devEnv = app.get('env') == 'development';

    const createHttpClient = opts => {
        const httpClient = addon.httpClient(opts);
        return {
            get: promisify(httpClient.get.bind(httpClient)),
            post: promisify(httpClient.post.bind(httpClient)),
            asUser: userKey => {
                const asUser = httpClient.asUser(request.query.userKey);
                return {
                    get: promisify(asUser.get.bind(asUser)),
                    post: promisify(asUser.post.bind(asUser))
                };
            }
        };
    };

    // Declare any Express [middleware](http://expressjs.com/api.html#middleware) you'd like to use here
    // Log requests, using an appropriate formatter by env
    app.use(morgan(devEnv ? 'dev' : 'combined'));
    // Include request parsers
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    // Gzip responses when appropriate
    app.use(compression());

    app.use(addon.middleware());

    if (devEnv) app.use(errorHandler());

    // http://expressjs.com/en/starter/basic-routing.html
    app.get('/', function(request, response) {
        response.sendFile(__dirname + '/dist/index.html');
    });

    app.get('/api/:jiraKey/board/:boardId', async (req, res) => {
        const httpClient = createHttpClient({
            clientKey: req.params.jiraKey, //'jira:3d8d605d-3d60-4016-a435-b7375d2104ff',
            addonKey: 'agile-cards-vr'
        });
        const columns = await getBoardColumns(httpClient, req.params.boardId);
        const issues = await getBoardIssues(httpClient, req.params.boardId);
        const board = createBoard(columns, issues);
        res.send(board);
    });

    app.get('/api/image', async (req, res) => {
        req.pipe(request(req.query.url)).pipe(res);
    });

    if (devEnv) addon.register();

    setTimeout(() => addon.reloadDescriptor(), 1000);
};
