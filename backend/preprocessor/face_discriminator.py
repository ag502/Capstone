from mtcnn import MTCNN
import cv2
# from Preprocess import makelist
from .Preprocess import makelist

def facedetect():
    frame_list = makelist()
    time = 0
    section=[]
    for img in frame_list:
        time +=1
        frame = cv2.imread(img)
        detector = MTCNN()
        check = detector.detect_faces(frame)
        if not check:
            pass
        elif check[0]['confidence']>0.97:
            if not section:
                section.append([time])
            elif len(section[-1])==1:
                section[-1].append(time)
            elif section[-1][1]==time-1:
                section[-1][1]=time
            else:
                section.append([time])
    if not section:
        pass
    elif len(section[-1])==1:
        del section[-1]

    return section
