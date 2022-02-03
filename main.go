package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"watermarkApi/lib"
)

type Watermark struct {
	Image string `json:"image"`
	Text  string `json:"text"`
}

func embed(w http.ResponseWriter, r *http.Request) {
	fmt.Println("call embed!!")
	var watermark Watermark
	json.NewDecoder(r.Body).Decode(&watermark)
	// sourceImage := lib.InputImage("./Lenna.png")
	// enc := base64.StdEncoding.EncodeToString(sourceImage)

	f, _ := os.Create("test.txt")
	fmt.Fprintln(f, r.Body)

	image := lib.DecodeBase64(watermark.Image)
	embedImage := lib.EmbedWatermark(image, watermark.Text)
	json.NewEncoder(w).Encode(Watermark{
		Image: lib.EncodeBase64(embedImage),
		Text:  watermark.Text,
	})
}

func decode(w http.ResponseWriter, r *http.Request) {
	var watermark Watermark
	json.NewDecoder(r.Body).Decode(&watermark)
	// sourceImage := lib.InputImage("./Lenna.png")
	// enc := base64.StdEncoding.EncodeToString(sourceImage)
	image := lib.DecodeBase64(watermark.Image)
	embedText := lib.DecodeWatermark(image)
	json.NewEncoder(w).Encode(Watermark{
		Text: strings.TrimSpace(embedText),
	})
}

func main() {
	http.HandleFunc("/api/embed", embed)
	http.HandleFunc("/api/decode", decode)
	fmt.Println("http://localhost:8080/api")
	http.ListenAndServe(":8080", nil)
}
