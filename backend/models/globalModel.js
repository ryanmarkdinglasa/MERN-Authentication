const sql = require('mssql');

const { database_connection } = require('../database/connection');

const getDataByTable = async (Table) => {
    let pool;
    try {
        pool = await database_connection();
        pool.setMaxListeners(15);
        const request = pool.request();
        const query = `SELECT * FROM ${Table}`;
        const result = await request.query(query);
        return result.recordset || [];
    } catch (error) {
        throw new Error(`Error fetching data from ${Table}: ${error.message}`);
    } finally {
        try {
            if (pool) {
                await pool.close();
                pool = null;
            }
        } catch (error) {
            throw new Error(`Error closing database connection in getDataByTable: ${error.message}`);
        }
    }
};


const getDataById = async (Id, Table) => {
    let pool;
    try {
        pool = await database_connection();
        pool.setMaxListeners(15);
        const request = pool.request();
        const query = `SELECT * FROM ${Table} WHERE Id = @Id`;
        request.input('Id', sql.Int, Id);
        const result = await request.query(query);
        return result.recordset || [];
    } catch (error) {
        throw new Error(`Error fetching data from ${Table} by Id ${Id}: ${error.message}`);
    } finally {
        try {
            if (pool) {
                await pool.close();
                pool = null;
            }
        } catch (error) {
            throw new Error(`Error closing database connection in getDataById: ${error.message}`);
        }
    }
};

const deleteDataById = async (Id, Table) => {
    let pool;
    try {
        pool = await database_connection();
        pool.setMaxListeners(15);
        const request = pool.request();
        const query = `DELETE FROM ${Table} WHERE Id = @Id`;
        request.input('Id', sql.Int, Id);
        const result = await request.query(query);
        return result.rowsAffected[0] === 1;
    } catch (error) {
        throw new Error(`Error deleting data from ${Table} by Id ${Id}: ${error.message}`);
    } finally {
        try {
            if (pool) {
                await pool.close();
                pool = null;
            }
        } catch (error) {
            throw new Error(`Error closing database connection in deleteDataById: ${error.message}`);
        }
    }
};


const insertData = async (Data) => {
    let pool;
    try {
        pool = await database_connection();
        pool.setMaxListeners(15);
        const request = pool.request();
        const query = `INSERT INTO workout([Id], [title], [reps], [loads]) VALUES (@Id, @title, @reps, @loads)`;
        request
            .input('Id', sql.Int, Data.Id)
            .input('title', sql.NVarChar(255), Data.title)
            .input('reps', sql.Int, Data.reps)
            .input('loads', sql.Int, Data.loads);
        const result = await request.query(query);
        return result.rowsAffected[0] > 0;
    } catch (error) {
        throw error;
    } finally {
        try {
            if (pool) {
                await pool.close();
            }
        } catch (error) {
            throw new Error(`Error closing database connection in insertData: ${error.message}`);
        }
    }
};

/*
(async () => {
    try {

        const test_data = {
            Id: 1,
            title: 'push ups',
            reps: 1,
            loads: 1
        };

        
        const insert = await insertData(test_data);
        if (insert) console.log('success');
        else console.log('failure');
   
        const get = await getDataById(1,'workout');
        console.log('data', get);

        const gettable = await getDataByTable('workout')
        console.log('workout', gettable);

        const deletedata = await deleteDataById(1,'workout')
        console.log('delete', deletedata);
    } catch (error) {
        console.error(error);
    }
})();
*/

//EXPORT THE CLASS
module.exports = {
    getDataByTable,
    deleteDataById,
    getDataById,
    insertData,
};
