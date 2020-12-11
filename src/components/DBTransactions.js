import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

const db_name = 'Employee.db';

export const DB_CONSTS = {
  EMPTABLE: 'employee',
  EMPEDU: 'empEductaion',
  EMPWORK: 'empWork',
  EMP_ID: 'empId',
  FNAME: 'empFName',
  LNAME: 'empLName',
  AGE: 'empAge',
  ADDR: 'empAddress',
  EDU_DET: 'courseName',
  EDU_OUTPUT: 'output',
  COMP_NAME: 'compName',
  PERIOD: 'period',
};

const CREATE_EMP_TABLE = `CREATE TABLE IF NOT EXISTS ${DB_CONSTS.EMPTABLE}(${DB_CONSTS.EMP_ID} INTEGER PRIMARY KEY AUTOINCREMENT, ${DB_CONSTS.FNAME} TEXT,${DB_CONSTS.LNAME} TEXT, ${DB_CONSTS.AGE} TEXT, ${DB_CONSTS.ADDR} TEXT)`;
const CREATE_EDU_TABLE = `CREATE TABLE IF NOT EXISTS ${DB_CONSTS.EMPEDU} (${DB_CONSTS.EMP_ID} INTEGER, ${DB_CONSTS.EDU_DET} TEXT, ${DB_CONSTS.EDU_OUTPUT} TEXT, FOREIGN KEY(${DB_CONSTS.EMP_ID}) REFERENCES ${DB_CONSTS.EMPTABLE}(${DB_CONSTS.EMP_ID}))`;
const CREATE_WORK_TABLE = `CREATE TABLE IF NOT EXISTS ${DB_CONSTS.EMPWORK} (${DB_CONSTS.EMP_ID} INTEGER, ${DB_CONSTS.COMP_NAME} TEXT, ${DB_CONSTS.PERIOD} TEXT, FOREIGN KEY(${DB_CONSTS.EMP_ID}) REFERENCES ${DB_CONSTS.EMPTABLE}(${DB_CONSTS.EMP_ID}))`;

let db;

const initstate = {
  fields: [
    {
      id: 'nameDetails',
      children: [
        {
          key: 'firstName',
          val: '',
          placeholder: 'First Name',
        },
        {
          key: 'lastName',
          val: '',
          placeholder: 'Last Name',
        },
      ],
    },
    {
      id: 'additionalDetails',
      children: [
        {
          key: 'age',
          val: '',
          placeholder: 'Age',
        },
        {
          key: 'address',
          val: '',
          placeholder: 'Address',
        },
      ],
    },
  ],
  educationFields: [],
  workExperienceFields: [],
};

class DBTransactions {
  async getDB() {
    try {
      db = await SQLite.openDatabase({
        name: db_name,
        createFromLocation: 1,
      });
      console.log(`DB Open success >> ${db.dbname}`);
      try {
        await db.transaction((transaction) => {
          transaction
            .executeSql(`${CREATE_EMP_TABLE}`, [])
            .then(() => {
              console.log(`${DB_CONSTS.EMPTABLE} created successfully`);
            })
            .catch((err) => {
              console.log(
                `Error in ${DB_CONSTS.EMPTABLE} creation >> ${err.message}`,
              );
            });
        });
      } catch (error) {
        console.log(error.message);
      }
      try {
        await db.transaction((transaction) => {
          transaction
            .executeSql(`${CREATE_EDU_TABLE}`, [])
            .then(() => {
              console.log(`${DB_CONSTS.EMPEDU} created successfully`);
            })
            .catch((err) => {
              console.log(
                `Error in ${DB_CONSTS.EMPEDU} creation >> ${err.message}`,
              );
            });
        });
      } catch (error) {
        console.log(error.message);
      }
      try {
        await db.transaction((transaction) => {
          transaction
            .executeSql(`${CREATE_WORK_TABLE}`, [])
            .then(() => {
              console.log(`${DB_CONSTS.EMPWORK} created successfully`);
            })
            .catch((err) => {
              console.log(
                `Error in ${DB_CONSTS.EMPWORK} creation >> ${err.message}`,
              );
            });
        });
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(`DB Error >> ${error.message}`);
    }
  }

  ExecuteQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.transaction((trans) => {
        trans.executeSql(
          query,
          params,
          (trans, result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          },
        );
      });
    });
  };

  async getLastEmpId() {
    try {
      await this.getDB();
      let res = await this.ExecuteQuery(`SELECT * FROM ${DB_CONSTS.EMPTABLE}`);
      if (res.rows.length == 0) {
        console.log('No recores EmpId is 1');
        return 1;
      } else {
        const empId = res.rows.item(res.rows.length - 1).empId;
        console.log(empId);
        return empId;
      }
    } catch (error) {
      console.log(`Error in fetching ID >>`, error.message);
    }
  }
  async getEmployee() {
    await this.getDB();
    try {
      let res = await this.ExecuteQuery(`SELECT * FROM ${DB_CONSTS.EMPTABLE}`);

      for (let index = 0; index < res.rows.length; index++) {
        console.log(res.rows.item(index));
      }
      return res.rows.length;
    } catch (error) {
      console.log(`Error in fetching employees >>> ${error.message}`);
    }
  }
  async getAllDetails() {
    await this.getDB();
    try {
      let res = await this.ExecuteQuery(`SELECT * FROM ${DB_CONSTS.EMPTABLE}`);
      let eRes = await this.ExecuteQuery(`SELECT * FROM ${DB_CONSTS.EMPEDU}`);
      let wRes = await this.ExecuteQuery(`SELECT * FROM ${DB_CONSTS.EMPWORK}`);
      console.log('Employee Table Contents');
      for (let index = 0; index < res.rows.length; index++) {
        console.log(res.rows.item(index));
      }
      console.log('Employee Education Table Contents');
      for (let index = 0; index < eRes.rows.length; index++) {
        console.log(eRes.rows.item(index));
      }
      console.log('Employee Work Table Contents');
      for (let index = 0; index < wRes.rows.length; index++) {
        console.log(wRes.rows.item(index));
      }
    } catch (error) {
      console.log(`Error in fetching employees >>> ${error.message}`);
    }
  }

  insertEmployee = async (values) => {
    await this.getDB();
    try {
      const res = await this.ExecuteQuery(
        `SELECT * FROM ${DB_CONSTS.EMPTABLE} WHERE ${DB_CONSTS.FNAME} = '${values.fields[0].children[0].val}'`,
        [],
      );
      if (res.rows.length == 0) {
        await this.ExecuteQuery(
          `INSERT INTO ${DB_CONSTS.EMPTABLE} (${DB_CONSTS.FNAME},${DB_CONSTS.LNAME},${DB_CONSTS.AGE},${DB_CONSTS.ADDR}) VALUES(?,?,?,?)`,
          [
            `${values.fields[0].children[0].val}`,
            `${values.fields[0].children[1].val}`,
            `${values.fields[1].children[0].val}`,
            `${values.fields[1].children[1].val}`,
          ],
        );
        const empID = await this.getLastEmpId();
        for (let i = 0; i < values.educationFields.length; i++) {
          await this.ExecuteQuery(
            `INSERT INTO ${DB_CONSTS.EMPEDU} VALUES('${empID}','${values.educationFields[i].children[0].val}','${values.educationFields[i].children[1].val}')`,
          );
        }

        for (let i = 0; i < values.workExperienceFields.length; i++) {
          await this.ExecuteQuery(
            `INSERT INTO ${DB_CONSTS.EMPWORK} VALUES('${empID}','${values.workExperienceFields[i].children[0].val}','${values.workExperienceFields[i].children[1].val}')`,
          );
        }

        ToastAndroid.show(
          `Employee Registraion Successful With EmplyeeID: ${empID}`,
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show('Employee Already registered!!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(`Error in Insertion >>> ${error.message}`);
    }
  };
  searchEmployee = async (empId) => {
    try {
      await this.getDB();
      let res = await this.ExecuteQuery(
        `SELECT * FROM ${DB_CONSTS.EMPTABLE} WHERE ${DB_CONSTS.EMP_ID} = ${empId}`,
      );
      let eRes = await this.ExecuteQuery(
        `SELECT * FROM ${DB_CONSTS.EMPEDU} WHERE ${DB_CONSTS.EMP_ID} = ${empId}`,
      );
      let wRes = await this.ExecuteQuery(
        `SELECT * FROM ${DB_CONSTS.EMPWORK} WHERE ${DB_CONSTS.EMP_ID} = ${empId}`,
      );
      if ((res.rows.length == 0)) {
        console.log('Nothing to Display with Employee ID: ', empId);
        return 0;
      } else {
        console.log('Employee Details');
        for (let index = 0; index < res.rows.length; index++) {
          console.log(res.rows.item(index));
        }
        console.log('Employee Education Details');
        for (let index = 0; index < eRes.rows.length; index++) {
          console.log(eRes.rows.item(index));
        }
        console.log('Employee Work Details');
        for (let index = 0; index < wRes.rows.length; index++) {
          console.log(wRes.rows.item(index));
        }
        return 1;
      }
    } catch (error) {
      console.log(`Error in fetching employee details >>> ${error.message}`);
    }
  };

  updateEmployeeBasic = async (empId, value) => {
    try {
      await this.getDB();
      await this.ExecuteQuery(
        `UPDATE ${DB_CONSTS.EMPTABLE} SET ${DB_CONSTS.ADDR} = '${value}' WHERE ${DB_CONSTS.EMP_ID} = ${empId}`,
      );
      ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT)
    } catch (error) {
      console.log('Basic updation error', error.message);
    }
  };
  updateEmployeeEdu = async (empId, cName, cPeriod) => {
    try {
      await this.getDB();
      let res = await this.ExecuteQuery(
        `SELECT * FROM ${DB_CONSTS.EMPEDU} WHERE (${DB_CONSTS.EMP_ID} = ${empId} AND ${DB_CONSTS.EDU_DET} = '${cName}')`,
      );
      if (res.rows.length > 0) {
        await this.ExecuteQuery(
          `DELETE FROM ${DB_CONSTS.EMPEDU} WHERE (${DB_CONSTS.EMP_ID} = ${empId} AND ${DB_CONSTS.EDU_DET} = '${cName}')`,
        );
        await this.ExecuteQuery(
          `INSERT INTO ${DB_CONSTS.EMPEDU} VALUES(${empId},'${cName}','${cPeriod}')`,
        );
      } else {
        await this.ExecuteQuery(
          `INSERT INTO ${DB_CONSTS.EMPEDU} VALUES(${empId},'${cName}','${cPeriod}')`,
        );
      }
      ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT)
    } catch (error) {
      console.log('Education updation error', error.message);
    }
  };

  updateEmployeeWork = async (empId, cName, cPeriod) => {
    try {
      await this.getDB();
      let res = await this.ExecuteQuery(
        `SELECT * FROM ${DB_CONSTS.EMPWORK} WHERE (${DB_CONSTS.EMP_ID} = ${empId} AND ${DB_CONSTS.COMP_NAME} = '${cName}')`,
      );
      if (res.rows.length > 0) {
        await this.ExecuteQuery(
          `DELETE FROM ${DB_CONSTS.EMPWORK} WHERE (${DB_CONSTS.EMP_ID} = ${empId} AND ${DB_CONSTS.COMP_NAME} = '${cName}')`,
        );
        await this.ExecuteQuery(
          `INSERT INTO ${DB_CONSTS.EMPWORK} VALUES(${empId},'${cName}','${cPeriod}')`,
        );
      } else {
        await this.ExecuteQuery(
          `INSERT INTO ${DB_CONSTS.EMPWORK} VALUES(${empId},'${cName}','${cPeriod}')`,
        );
      }
      ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT)
    } catch (error) {
      console.log('Education updation error', error.message);
    }
  };

  deleteEmployee = async (empId) => {
    try {
      await this.getDB();
      const res = await this.ExecuteQuery(
        `SELECT * FROM ${DB_CONSTS.EMPTABLE} WHERE ${DB_CONSTS.EMP_ID} = '${empId}'`,
      );
      if (res.rows.length == 1) {
        await this.ExecuteQuery(
          `DELETE FROM ${DB_CONSTS.EMPEDU} WHERE ${DB_CONSTS.EMP_ID} = '${empId}'`,
        );
        await this.ExecuteQuery(
          `DELETE FROM ${DB_CONSTS.EMPWORK} WHERE ${DB_CONSTS.EMP_ID} = '${empId}'`,
        );
        await this.ExecuteQuery(
          `DELETE FROM ${DB_CONSTS.EMPTABLE} WHERE ${DB_CONSTS.EMP_ID} = '${empId}'`,
        );
        console.log(
          `Details of Employee with EmployeeID: ${empId} has been deleted successfully`,
        );
      } else {
        console.log("Entered ID doesn't exists. Please chesck and try again!!");
      }
    } catch (error) {
      console.log(`Error Deleting Records >> ${error.message}`);
    }
  };
  dropTables = async () => {
    try {
      await this.getDB();
      await this.ExecuteQuery(`DROP TABLE ${DB_CONSTS.EMPWORK}`);
      await this.ExecuteQuery(`DROP TABLE ${DB_CONSTS.EMPEDU}`);
      await this.ExecuteQuery(`DROP TABLE ${DB_CONSTS.EMPTABLE}`);

      console.log(`Tables Dropped Succesfully`);
    } catch (error) {
      console.log(`Error in Dropping Tables >>> ${error.message}`);
    }
  };
}

export default DBTransactions;
