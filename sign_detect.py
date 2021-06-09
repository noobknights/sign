import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import cv2
import os

##########################

TOP_LEFT = (0,0)
BOTTOM_RIGHT = (300,300)

##########################
def to_alphabet(number):
    return chr(number+65)

def prediction(model,image):
    image = image.reshape(1,28,28,1)
    return to_alphabet(np.argmax(model.predict(image)))
##########################


os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'

model = load_model('sign_language.h5')

camera = cv2.VideoCapture(0)

while True:
    ret, frame = camera.read()
    frame = cv2.flip(frame,1)
    frame = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
    frame = cv2.rectangle(frame,TOP_LEFT,BOTTOM_RIGHT,(0,0,255),thickness=3)
    window = frame[:300,:300]
    window = cv2.resize(window,(28,28))
    pred = prediction(model,window)
    cv2.imshow('camera',frame)
    print(pred)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camera.release()
cv2.destroyAllWindows()
