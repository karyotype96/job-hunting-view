package services

import (
	"database/sql"
	_ "log"
	"os"
	"time"

	"github.com/karyotype96/job-hunting-view/api/models"
	"github.com/karyotype96/job-hunting-view/api/utils"

	_ "modernc.org/sqlite"
)

const dbPath = "./recs.db"

var DB *sql.DB

func InitDatabase() {
	if _, err := os.Stat(dbPath); err != nil {
		file, err := os.Create(dbPath)
		if err != nil {
			panic(err)
		}
		file.Close()
	}

	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		panic(err)
	}

	time.Sleep(time.Millisecond * 2000)
	DB = db

	query, err := DB.Prepare(`CREATE TABLE IF NOT EXISTS records (
		id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
		companyName varchar(255) NOT NULL,
		status integer NOT NULL,
		timeApplied timestamp NOT NULL
	)`)
	if err != nil {
		panic(err)
	}
	query.Exec()
}

func GetRecords(status *utils.ApplicationStatus) ([]models.Record, error) {
	var results []models.Record
	var queryResult *sql.Rows
	var err error

	query := `SELECT id, companyName, status, timeApplied FROM records`
	if status != nil {
		query += ` WHERE status = ?`
		queryResult, err = DB.Query(query, status)
		if err != nil {
			panic(err)
		}
	} else {
		queryResult, err = DB.Query(query)
		if err != nil {
			panic(err)
		}
	}

	for (*queryResult).Next() {
		var newResult models.Record
		err := (*queryResult).Scan(
			&newResult.ID,
			&newResult.CompanyName,
			&newResult.Status,
			&newResult.TimeApplied,
		)
		if err != nil {
			panic(err)
		}

		results = append(results, newResult)
	}

	queryResult.Close()
	return results, nil
}

func AddRecord(record models.Record) (models.Record, error) {
	resultRecord := record

	query := `INSERT INTO records (companyName, status, timeApplied) VALUES (?, ?, ?);`
	result, err := DB.Exec(query, resultRecord.CompanyName, resultRecord.Status, resultRecord.TimeApplied)
	if err != nil {
		panic(err)
	}

	record.ID, err = result.LastInsertId()

	return resultRecord, err
}
