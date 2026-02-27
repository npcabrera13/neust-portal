const fs = require('fs');

fetch('http://58.69.126.78:8000/gradesviewer/')
    .then(res => res.text())
    .then(html => {
        fs.writeFileSync('gradesviewer.html', html);
        console.log('Downloaded gradesviewer layout.');
    })
    .catch(err => console.error(err));
