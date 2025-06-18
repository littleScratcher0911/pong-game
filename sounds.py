import pygame.mixer

pygame.mixer.init()

# Lade Sounds
hit_sound = pygame.mixer.Sound("hit.wav")
score_sound = pygame.mixer.Sound("score.wav")
pygame.mixer.music.load("background_music.mp3")
pygame.mixer.music.set_volume(0.5)
pygame.mixer.music.play(-1)  # Endlosschleife

# Ballkontakt
hit_sound.play()

# Punkt erzielt
score_sound.play()
