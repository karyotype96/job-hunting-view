package models

import (
	"time"

	"github.com/karyotype96/job-hunting-view/api/utils"
)

type Record struct {
	ID          int64                   `json:"id"`
	CompanyName string                  `json:"companyName"`
	Status      utils.ApplicationStatus `json:"status"`
	TimeApplied time.Time               `json:"timeApplied"`
}
