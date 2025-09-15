package router

import (
	"github.com/gin-gonic/gin"
	"github.com/karyotype96/job-hunting-view/api/controllers"
	"github.com/karyotype96/job-hunting-view/api/middleware"
)

func CreateRouter() *gin.Engine {
	r := gin.Default()

	r.Use(middleware.CORSMiddleware())

	r.GET("/api/ping", controllers.Ping)

	// TODO: Program endpoints:
	r.GET("/api/records", controllers.GetRecords)
	r.POST("/api/records", controllers.CreateRecord)
	r.POST("/api/records/:id", controllers.UpdateRecord)
	r.DELETE("/api/records/:id", controllers.DeleteRecord)

	return r
}
