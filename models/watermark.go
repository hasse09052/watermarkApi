package models

import "watermarkApi/lib"

type Watermark struct {
	Image string `json:"image"`
	Text  string `json:"text"`
}

func (w Watermark) EmbedWatermark() string {
	image := lib.DecodeBase64(w.Image)
	embedImage := lib.EmbedWatermark(image, w.Text)
	return lib.EncodeBase64(embedImage)
}

func (w Watermark) DecodeWatermark() string {
	image := lib.DecodeBase64(w.Image)
	return lib.DecodeWatermark(image)
}
