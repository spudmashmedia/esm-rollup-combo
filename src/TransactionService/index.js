import Sequalize from "sequelize";
import path from "path";

export default class TransactionService {
    constructor(options) {
        this.dbFile = options.dbFile;
        this.logger = options.logger;
        this.maxLogs = options.maxLogs || 10;

        const filepath = path.join(__dirname, "..", this.dbFile);
        console.log(filepath);
        this.db = new Sequalize("database", "username", "password", {
            dialect: "sqlite",
            storage: filepath
        });

        this.Transaction = this.db.define("transaction", {
            // id: { type: Sequalize.INTEGER, primaryKey: true, autoIncrement: true, defaultValue: 1},
            // transId: {type: Sequalize.STRING, allowNull: false},
            state: {
                type: Sequalize.STRING,
                allowNull: false
            },
            data: {
                type: Sequalize.JSON,
                allowNull: true
            },
            modTimestamp: {
                type: Sequalize.DATE,
                defaultValue: Sequalize.NOW
            }
        });

        this.db.sync();
        this.db.authenticate();
    }

    async Close() {
        this.logger.Information("TransactionService::Close");
        try {
            await this.db.close();
        } catch (err) {
            throw err;
        }
    }

    async GetHistory() {
        this.logger.Information("TransactionService::GetHistory");

        const res = {};

        try {
            res.data = await this.Transaction.findAll({
                limit: this.maxLogs
            });
            await this.Transaction.sync();
        } catch (err) {
            res.error = err;
        }
        return res;
    }

    async PutHistory(state, data) {
        this.logger.Information("TransactionService::PutHistory");

        const res = {};
        try {
            //check count
            const getRes = await this.Transaction.findAndCountAll({
                order: [["createdAt", "ASC"]]
            });

            console.log(`>>>> count: ${getRes.count}`);
            if (getRes && getRes.count && getRes.count > this.maxLogs) {
                await this.Transaction.destroy({
                    where: {
                        id: getRes.rows[0].id
                    }
                });
            }

            await this.Transaction.create({
                data: data,
                state: state,
                modTimestamp: new Date()
            });

            await this.Transaction.sync();

            res.data = {
                status: "200"
            };
        } catch (err) {
            res.error = err;
        }
        return res;
    }
}
