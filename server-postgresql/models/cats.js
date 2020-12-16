const db = require ('../db/config')
const SQL = require("sql-template-strings");

class Cat {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.age = data.age
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const catsData = await db.run(SQL`SELECT * FROM cats;`)
                const cats = catsData.rows.map(d => new Cat(d))
                resolve(cats);
            } catch (err) {
                reject("Error retrieving cats")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let catData = await db.run(SQL`SELECT * FROM cats WHERE id = ${id};`);
                let cat = new Cat(catData.rows[0]);
                resolve (cat);
            } catch (err) {
                reject('Cat not found');
            }
        });
    }

    static findByOwner (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let catsData = await db.run(SQL`SELECT * FROM cats WHERE ownerId = ${id};`);
                const cats = catsData.rows.map(d => new Cat(d))
                resolve (cats);
            } catch (err) {
                reject('Error retrieving owner\'s cats');
            }
        });
    }

    static create(name, age){
        return new Promise (async (resolve, reject) => {
            try {
                let catData = await db.run(SQL`INSERT INTO cats (name, age) VALUES (${name}, ${age}) RETURNING *;`);
                let newCat = new Cat(catData.rows[0]);
                resolve (newCat);
            } catch (err) {
                reject('Error retrieving owner\'s dogs');
            }
        });
    }

    update(updateData) {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedCatData = await db.run(SQL`UPDATE cats SET age = age + 1 WHERE id = ${this.id} RETURNING *;`);
                let updatedCat = new Cat(updatedCatData.rows[0]);
                resolve (updatedCat);
            } catch (err) {
                reject('Error updating cat');
            }
        });
    }

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                await db.run(SQL`DELETE FROM cats WHERE id = ${this.id};`);
                resolve('Book was deleted')
            } catch (err) {
                reject('Book could not be deleted')
            }
        })
    }

}

module.exports = Cat;