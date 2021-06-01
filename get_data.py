import cv2
import time
import os

IMAGE_PATH = 'Tensorflow/workspace/images/collected'

if os.path.exists(IMAGE_PATH):
    pass
else:
    os.mkdir(IMAGE_PATH)

labels = ['Hello','Thanks','Yes','No','Love you']
img_num = 20

for label in labels:
    if os.path.exists(os.path.join(IMAGE_PATH,label)):
        pass
    else:
        os.mkdir(os.path.join(IMAGE_PATH,label))
    cap = cv2.VideoCapture(0)
    print("capturing images for {}".format(label))
    time.sleep(5)
    for img in range(img_num):
        ret, frame = cap.read()
        image = os.path.join(IMAGE_PATH,label,label + '_' + '{}.jpg'.format(img))
        print(image)
        cv2.imwrite(image, frame)
        cv2.imshow('camera',frame)
        time.sleep(2)
        if cv2.waitKey(1) and 0xFF == ord('q'):
            break
    cap.release()