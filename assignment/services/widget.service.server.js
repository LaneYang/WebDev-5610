module.exports = function (app) {

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: __dirname + '/../../dist/my-project/assets/uploads/',
        filename: function (req, file, cb) {
            cb(null,  file.originalname);
        }
    });

    var upload = multer({storage: storage});

    var widgets = [

    ];
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findWidgetsForPage);
    app.get('/api/page/:pageId/widget/reorder', reorderWidget);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/uploads', upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {

        // var uid = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        //
        //
        var widgetId = req.body.widgetId;
        // var width = req.body.widtfh;
        var myFile = req.file;

        if (myFile == null) {
            res.status(200).send({message: 'No file uploaded'});
            return;
        }



        var filename      = myFile.filename;

        var widget = {url: 'file://' + __dirname + '/../../src/assets/uploads/' + filename}
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i].widgetId === widgetId) {
                widgets[i].url = 'assets/uploads/' + filename;
                res.status(200).send({message: 'File uploaded', url: ''});
                return;
            }
        }
        var newWidgetId = req.body.newWidgetId;
        if (newWidgetId === '') {
            let url = 'assets/uploads/' + filename;
            res.status(200).send({message: 'File uploaded', url: url});
            return;
        }
    }

    function createWidget(req, res) {
        var pageId = req.params['pageId'];
        var widget = req.body;
        widget.widgetId = new Date().getTime() + '';
        widget.pageId = pageId;
        widgets.push(widget);
        res.status(200).send(widget);
    }

    function findWidgetsForPage(req, res) {
        let pageId = req.params['pageId'];
        const result = [];
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x].pageId === pageId) {
                result.push(widgets[x]);
            }
        }
        res.status(200).send(result);
    }

    function reorderWidget(req, res) {
        let pageId = req.params['pageId'];
        const result = [];
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x].pageId === pageId) {
                result.push(widgets[x]);
            }
        }
        let initial = parseInt(req.query.index1);
        let final = parseInt(req.query.index2);
        let temp = result[initial];
        result.splice(initial, 1);
        result.splice(final, 0, temp);
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < widgets.length; j++) {
                if (widgets[j].widgetId === result[i].widgetId) {
                    widgets.splice(j, 1);
                    widgets.splice(widgets.length, 0, result[i]);
                    break;
                }
            }
        }
        res.status(200).send(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        var widget = null;
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x].widgetId === widgetId) {
                widget = widgets[x];
                res.status(200).send(widget);
                return;
            }
        }
        res.json({message: 'Widget not found!'});
    }

    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var widget = req.body;
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x].widgetId === widgetId) {
                widgets[x].text = widget.text;
                widgets[x].size = widget.size;
                widgets[x].url = widget.url;
                widgets[x].width = widget.width;
                res.status(200).send(widgets[x]);
                return;
            }
        }
        res.json({message: 'Widget not found!'});
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        for (let x = 0; x < widgets.length; x++) {
            if (widgets[x].widgetId === widgetId) {
                widgets.splice(x, 1);
                res.status(200).send(widgets);
                return;
            }
        }
        res.json({message: 'Widget not found!'});
    }
}
