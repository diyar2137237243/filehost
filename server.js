const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`);
const { secret, link } = require(`./auth.json`)
const d = new Date()
const app = express();
const port = 225;

function checksrc() {
    console.log(`[ℹ️ ] Running file checks...`)
    if (!fs.existsSync(`./files`)) {
        console.log(`[❌] Please create the files folder.`)
        process.exit()
    } 
    else 
        console.log(`[✅] Files folder found.`)

    if (!fs.existsSync(`./files/text`)) {
        console.log(`[❌] Please create a text folder in the files folder.`)
        process.exit()
    }
    else 
        console.log(`[✅] Text folder found.`)

    if (!fs.existsSync(`./files/media`)) {
        console.log(`[❌] Please create a media folder in the files folder.`)
        process.exit()
    }
    else 
        console.log(`[✅] Media folder found.`)

    if (!fs.existsSync(`./files/file`)) {
        console.log(`[❌] Please create a file folder in the files folder.`)
        process.exit()
    }
    else
        console.log(`[✅] File folder found.`)

    console.log(`[ℹ️ ] File checks finished!`)
}

function randomMath(x) {
    let ops = [
        x => x + Math.floor(Math.random() * 10),
        x => x - Math.floor(Math.random() * 10),
        x => x * (Math.random() * 5).toFixed(2),
        x => x / ((Math.random() * 5) + 1).toFixed(2),
        x => Math.pow(x, 2),
        x => Math.sqrt(x),
        x => -x,
        x => x % Math.floor(Math.random() * 10 + 1)
    ];

    let randomOp = ops[Math.floor(Math.random() * ops.length)];
    return randomOp(x);
}

app.use(express.static(path.join(__dirname, `files`)));

app.use(
    express.raw({
        inflate: true,
        limit: `1000mb`,
        type: () => true,
    })
);

app.post(`/text`, (req, res) => {
    const month = d.getMonth() + 1
    const date = d.getDate() + `-` + month + `-` + d.getFullYear()
    const r = randomMath(Math.random()).toString() + `-` + date
    const b = JSON.stringify(req.body)
    const body = JSON.parse(b)
    const data = body.data
    const text = data.map(n => String.fromCharCode(n)).join(``)
    const txt = `./files/text/${r}.txt`
    const html = `./files/text/${r}.html`
    const code = `
<!doctype html>
<html>

    <head>
        <title>filehost</title>
        <meta content="fart host" property="og:title" />
        <meta content="${text}" property="og:description" />
        <meta content="${link}" property="og:url" />
        <meta content="#09090b" data-react-helmet="true" name="theme-color" />
        <meta charset="UTF-8">
        <meta name="robots" content="noindex">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <style>
        body {
            background-color: #09090b;
        }
    </style>
</html>`
    if (req.query.secret == secret) {
        fs.appendFile(txt, text, err => {
            if (err) {
                console.error(err);
            }
            else {
                console.log(`Written ${text} to ${txt}`);
            }
        });
        fs.appendFile(html, code, err => {
            if (err) {
                console.error(err);
            }
            else {
                res.status(200);
                res.send(`${link}/text/${r}.html`);
                console.log(`Written ${text} to ${html}`);
            }
        });
    }
    else {
        console.log(`Someone tried to use your api! Luckily, the protection system stopped the request and sent them a 403 before he could do anything.`)
        res.sendStatus(403);
    }
});
app.post(`/media`, (req, res) => {
    const month = d.getMonth() + 1
    const date = d.getDate() + `-` + month + `-` + d.getFullYear()
    const r = randomMath(Math.random()).toString() + `-` + date
    const b = JSON.stringify(req.body)
    const body = JSON.parse(b)
    const data = body.data
    const x = data.map(n => String.fromCharCode(n)).join(``)
    const buf = new Buffer(x, `binary`);
    const png = `./files/media/${r}.png`
    const html = `./files/media/${r}.html`
    const code = `
<!doctype html>
<html>

    <head>
        <title>filehost</title>
        <meta content="fart host" property="og:title" />
        <meta content="fish are the loneliest pet" property="og:description" />
        <meta content="${link}" property="og:url" />
        <meta content="#09090b" data-react-helmet="true" name="theme-color" />
        <meta charset="UTF-8">
        <meta name="robots" content="noindex">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="${link}/media/${r}.png" />
    </head>

    <style>
        body {
            background-color: #09090b;
        }
    </style>

    <body class="min-h-screen flex flex-col justify-center">
        <img class="flex mx-auto h-fit max-w-[32rem] w-full p-4" src="${link}/media/${r}.png" />
    </body>
</html>`
    if (req.query.secret == secret) {
        fs.appendFile(png, buf, err => {
            if (err) {
                console.error(err);
            }
            else {
                console.log(`Written media to ${png}`);
            }
        })
        fs.appendFile(html, code, err => {
            if (err) {
                console.error(err);
            }
            else {
                res.status(200);
                res.send(`${link}/media/${r}.html`);
                console.log(`Written media to ${html}`);
            }
        });
    }
    else {
        console.log(`Someone tried to use your api! Luckily, the protection system stopped the request and sent them a 403 before he could do anything.`)
        res.sendStatus(403);
    }
});

app.post(`/file`, (req, res) => {
    const month = d.getMonth() + 1
    const date = d.getDate() + `-` + month + `-` + d.getFullYear()
    const r = randomMath(Math.random()).toString() + `-` + date
    const b = JSON.stringify(req.body)
    const body = JSON.parse(b)
    const data = body.data
    const x = data.map(n => String.fromCharCode(n)).join(``)
    const buf = new Buffer(x, `binary`);
    const mp4 = `./files/file/${r}.mp4`
    const html = `./files/file/${r}.html`
    const code = `<!DOCTYPE html>
    <html>
        <head>
            <title>filehost</title>
            <meta content="fart host" property="og:title" />
            <meta property="og:url" content="${link}/file/${r}.mp4">
            <meta content="#09090b" data-react-helmet="true" name="theme-color" />
            <meta charset="UTF-8">
            <meta name="robots" content="noindex">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:video" content="${link}/file/${r}.mp4" />
	    <meta property="og:type" content="video">
	    <meta property="og:video:type" content="video">
	    <meta http-equiv="refresh" content="0; url='${link}/file/${r}.mp4'">
        </head>
        <style>
            body {
                background-color: #09090b;
            }
        </style>
    </html>`
    if (req.query.secret == secret) {
        fs.appendFile(mp4, buf, err => {
            if (err) {
                console.error(err);
            }
            else {
                console.log(`Written video to ${mp4}`);
            }
        })
        fs.appendFile(html, code, err => {
            if (err) {
                console.error(err);
            }
            else {
                res.status(200);
                res.send(`${link}/file/${r}.html`);
                console.log(`Written video to ${html}`);
            }
        });
    }
    else {
        console.log(`Someone tried to use your api! Luckily, the protection system stopped the request and sent them a 403 before he could do anything.`)
        res.sendStatus(403);
    }
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    checksrc()
    console.log(`Server up and running on port ${port}!`);
});
