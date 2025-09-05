package controllers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/karyotype96/job-hunting-view/api/models"
	"github.com/karyotype96/job-hunting-view/api/services"
	"github.com/karyotype96/job-hunting-view/api/utils"
)

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "server ok"})
}

func GetRecords(c *gin.Context) {
	var status *utils.ApplicationStatus

	statusParam := c.Query("status")
	if statusParam != "" {
		parsedStatus, err := strconv.Atoi(statusParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid query value parameter"})
			return
		}

		parsedStatusAS := utils.ApplicationStatus(parsedStatus)
		status = &parsedStatusAS
	}

	records, err := services.GetRecords(status)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Records could not be accessed."})
		return
	}

	c.JSON(http.StatusOK, records)
}

func CreateRecord(c *gin.Context) {
	var newRecord models.Record

	if err := c.ShouldBindJSON(&newRecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON body"})
		log.Println("Error: request body JSON could not bind to record struct")
		return
	}

	newRecord, err := services.AddRecord(newRecord)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record was not added properly"})
	}

	c.JSON(http.StatusCreated, newRecord)
}

func UpdateRecord(c *gin.Context) {

}

func DeleteRecord(c *gin.Context) {

}
