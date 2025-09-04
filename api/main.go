package main

import (
	"github.com/karyotype96/job-hunting-view/api/router"
)

func main() {
	r := router.CreateRouter()
	r.Run(":4001")
}
