// #NodeJS Upload Files with 'formidable' Module
const http = require("http");
var formidable = require("formidable");
var fs = require("fs");

http
  .createServer(function (req, res) {

    if (req.url == "/fileupload") {

      // #2-Parse the Uploaded File
      var form = new formidable.IncomingForm();     // file được submit từ form
      console.log("form:", form)
      form.parse(req, function (err, fields, files) {
        // var oldpath = files.filetoupload.filepath;
        // console.log("oldpath:", oldpath)
        // res.write("File uploaded");
        // res.end();

        // #3-Save the File
           var oldpath = files.filetoupload.filepath;
           var newpath =
             "C:/Users/ahihi/Downloads/" + files.filetoupload.originalFilename;
           console.log("oldpath:", oldpath);
           console.log("newpath:", newpath);
            fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
              res.write("File uploaded and moved!");
              res.end();
            });
      });

    } else {
      // #1-Create an Upload File
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write("</form>");
      return res.end();
    }

  })
  .listen(8080,() => {
    console.log("The web server on post 8080")  ;
  });
