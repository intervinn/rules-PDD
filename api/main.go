package main

import (
	"fmt"
	"reflect"

	"github.com/gofiber/fiber/v2"
)

var (
	app            = fiber.New()
	correctAnswers = map[string]string{
		"1": "1",
		"2": "3",
		"3": "1",
		"4": "2",
		"5": "2",
	}
	result = QuizResult{}
)

type QuizResult struct {
	Answer1 string `json:"1"`
	Answer2 string `json:"2"`
	Answer3 string `json:"3"`
	Answer4 string `json:"4"`
	Answer5 string `json:"5"`
}

func score() int {
	var score int = 0
	for k := range correctAnswers {
		if reflect.Indirect(reflect.ValueOf(&result)).FieldByName(fmt.Sprintf("Answer%v", k)).String() == correctAnswers[k] {
			score++
		}
	}
	return score
}

func init() {
	app.Post("/result", func(ctx *fiber.Ctx) error { // update results | обновить результат
		fmt.Println("nice u sent")
		fmt.Println(result.Answer1)
		fmt.Println(ctx.Body())
		ctx.BodyParser(&result)
		return nil
	})

	app.Get("/result", func(ctx *fiber.Ctx) error { // get results | получить мап с правильными/неправильными ответами, баллы
		fmt.Println("get request")
		return ctx.JSON(
			map[string]any{
				"1":     result.Answer1 == correctAnswers["1"],
				"2":     result.Answer2 == correctAnswers["2"],
				"3":     result.Answer3 == correctAnswers["3"],
				"4":     result.Answer4 == correctAnswers["4"],
				"5":     result.Answer5 == correctAnswers["5"],
				"score": score(),
			},
		)
	})
}

func main() {
	app.Listen(":4000")
}
