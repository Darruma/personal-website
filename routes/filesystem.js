const express = require('express');
const router = express.Router();
const get_repos = require('../actions/get_repos');
let fs = {
    name: '/',
    type: 'directory',
    children: [
        {
            name: 'projects',
            type: 'directory',
            children: []
        },
        {
            name: 'blog',
            type: 'directory',
            children: []
        },
        {
            name: 'instructions.txt',
            type: 'file',
            data: 'Hello'
        },
    ]
}
function base64_to_ascii(b, name) {
    if (b == undefined) {
        return name
    } else {
        return Buffer.from(b, 'base64').toString('ascii');
    }
}
router.get('/filesystem', async (req, res) => {
    try {
        const data = await get_repos()
        const repo_data = data[data.length - 1]
        const repos_amount = repo_data.length
        const language_objects = data.slice(repos_amount, data.length - 1)
        console.log(language_objects);
        const langs = Array.from(new Set(language_objects.reduce((arr, obj) => {
            return [...arr, ...Object.keys(obj)]
        }, [])))
        console.log(langs)
        fs.children[0].children = langs.map(l => {
            return {
                name: l,
                type: 'directory',
                children: []
            }
        })
        repo_data.forEach((repo, index) => {
            const readme = base64_to_ascii(data[index].content, repo.name);
            repo_languages = Object.keys(language_objects[index])
            repo_languages.forEach(lang => {
                const folderIndex = fs.children[0].children.findIndex(language_folder => language_folder.name == lang);
                fs.children[0].children[folderIndex].children.push(
                    {
                        name: repo.name,
                        type: 'directory',
                        children: [{
                            name: repo.name + ".md",
                            type: 'file',
                            data: readme
                        }]
                    })
            })
        })
        res.send({
            success: true,
            filesystem: fs,
        })
    }
    catch (err) {
        console.log(err)
        res.send({
            success: false,
            error: err
        })
    }
})

module.exports = router;
