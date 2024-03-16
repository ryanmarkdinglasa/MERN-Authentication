const { connect } = require('mssql');

const database_connection = async () => {
    try {
        const config = {
            user: 'sa',
            password: 'innosoft',
            server: 'localhost',
            database: 'test',
            port: 1433,
            options: { encrypt: false }
        };

        const pool = await connect(config);
        pool.setMaxListeners(15);

        const result = await pool.query`SELECT 1 AS Result`;
        // Check if the query returned a result
        const isConnected = result.recordset.length > 0;
        console.log('Connection ', isConnected);

        return pool;
    } catch(error) {
        throw new Error(`Database Connection Error: ${error.message}`);
    }
};

module.exports = {
    database_connection
};


// If you want to run it standalone
(async () => {
    try {
        await database_connection();
    } catch (error) {
        console.error(error);
    }
})();