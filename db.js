const Pool = require("pg").Pool;

const pool = new Pool({
    "user": "gvfxwlqsgejzba",
    "password": "4ad285c652c6e4af1a8e6c60657c1de874ffcc18974353c0645f6442ef6c2e02",
    "database": "d30peii9ouik3l",
    "host": "ec2-34-233-186-251.compute-1.amazonaws.com",
    "port": 5432,
    "ssl": true
});

module.exports = pool;