package models

import (
	"watermarkApi/lib"
)

type Watermark struct {
	Image string `json:"image"`
	Text  string `json:"text"`
}

func (w Watermark) EmbedWatermark() string {
	image := lib.DecodeBase64(w.Image)
	embedImage := lib.EmbedWatermark(image, w.Text)

	var extension lib.Extension
	switch w.Image[:5] {
	case "iVBOR":
		extension = lib.Png
	case "/9j/4":
		extension = lib.Jpeg
	default:
		return ""
	}

	return lib.EncodeBase64(embedImage, extension)
}

func (w Watermark) DecodeWatermark() string {
	image := lib.DecodeBase64(w.Image)
	return lib.DecodeWatermark(image)
}
