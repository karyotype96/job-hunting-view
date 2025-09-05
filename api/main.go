package main

import (
	"github.com/karyotype96/job-hunting-view/api/router"
	"github.com/karyotype96/job-hunting-view/api/services"
)

func main() {
	services.InitDatabase()

	r := router.CreateRouter()
	r.Run(":4001")
}
