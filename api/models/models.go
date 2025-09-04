package models

type Record struct {
	ID          int    `json:"id"`
	CompanyName string `json:"companyName"`
	Status      int    `json:"status"`
}
