module.exports = function (app) {
    var pages = [
        {pageId: '1111', name: 'ipsum', websiteId: '123', description: 'Lorem'},
        {pageId: '2222', name: 'ipsum2', websiteId: '123', description: 'Lorem'},
        {pageId: '3333', name: 'ipsum3', websiteId: '123', description: 'Lorem'},
        {pageId: '4444', name: 'ipsum4', websiteId: '123', description: 'Lorem'}
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var websiteId = req.params['websiteId'];
        var page = req.body;
        page.pageId = new Date().getTime() + '';
        page.websiteId = websiteId;
        pages.push(page);
        res.status(200).send(page);
    }

    function findAllPagesForWebsite(req, res) {
        let websiteId = req.params['websiteId'];
        const result = [];
        for (let x = 0; x < pages.length; x++) {
            if (pages[x].websiteId === websiteId) {
                result.push(pages[x]);
            }
        }
        res.status(200).send(result);
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        var page = null;
        for (let x = 0; x < pages.length; x++) {
            if (pages[x].pageId === pageId) {
                page = pages[x];
                res.status(200).send(page);
                return;
            }
        }
        res.json({message: 'Page not found!'});
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var page = req.body;
        for (let x = 0; x < pages.length; x++) {
            if (pages[x].pageId === pageId) {
                pages[x].name = page.name;
                pages[x].description = page.description;
                res.status(200).send(pages[x]);
                return;
            }
        }
        res.json({message: 'Page not found!'});
    }

    function deletePage(req, res) {
        var pageId = req.params['pageId'];
        var page = null;
        for (let x = 0; x < pages.length; x++) {
            if (pages[x].pageId === pageId) {
                pages.splice(x, 1);
                res.status(200).send(pages);
                return;
            }
        }
        res.json({message: 'Page not found!'});
    }
}
