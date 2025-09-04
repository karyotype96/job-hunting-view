package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karyotype96/job-hunting-view/api/models"
)

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "server ok"})
}

func GetRecords(c *gin.Context) {

}

func CreateRecord(c *gin.Context) {
	var newRecord models.Record

	if err := c.ShouldBindJSON(&newRecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	c.JSON(http.StatusOK, newRecord)
}

func UpdateRecord(c *gin.Context) {

}

func DeleteRecord(c *gin.Context) {

}
