class AI:
    def __init__(self, paddle, difficulty):
        self.paddle = paddle
        self.difficulty = difficulty

    def move(self, ball):
        if self.difficulty == 'easy':
            self.paddle.rect.centery = ball.rect.centery
        elif self.difficulty == 'medium':
            if ball.rect.centery < self.paddle.rect.centery:
                self.paddle.move(up=True)
            elif ball.rect.centery > self.paddle.rect.centery:
                self.paddle.move(up=False)
        elif self.difficulty == 'hard':
            if ball.rect.centery < self.paddle.rect.centery:
                self.paddle.move(up=True)
            elif ball.rect.centery > self.paddle.rect.centery:
                self.paddle.move(up=False)
