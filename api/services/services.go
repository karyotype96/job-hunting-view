package services

import (
	"database/sql"
	"errors"
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
	var queryParams []any

	query := `SELECT id, companyName, status, timeApplied FROM records`
	if status != nil {
		query += ` WHERE status = ?;`
		queryParams = append(queryParams, *status)
	}

	queryResult, err := DB.Query(query, queryParams...)
	if err != nil {
		return results, errors.New("failed to get records from database")
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
			return results, errors.New("failed to scan sql rows into record")
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
		return resultRecord, errors.New("failed to insert new record into table")
	}

	record.ID, err = result.LastInsertId()

	return resultRecord, err
}

func ChangeRecord(record models.Record, id int64) error {
	query := `UPDATE records SET companyName = ?, status = ?, timeApplied = ? WHERE id = ?`
	_, err := DB.Exec(query, record.CompanyName, record.Status, record.TimeApplied, id)
	if err != nil {
		return err
	}

	return nil
}
