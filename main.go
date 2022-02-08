package main

import (
	"net/http"
	"watermarkApi/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.StaticFS("/", http.Dir("views"))
	router.POST("/api/embed", controllers.Embed)
	router.POST("/api/decode", controllers.Decode)

	router.Run()
}
