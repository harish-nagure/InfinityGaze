from flask import Flask, jsonify
from flask_cors import CORS
import cv2
import math
from cvzone.HandTrackingModule import HandDetector
from threading import Thread
import pyautogui
import time
pyautogui.FAILSAFE = False
app = Flask(__name__)
CORS(app)  

detector = HandDetector()
shield = cv2.VideoCapture("shield.mp4")

def calculate_distance(point1, point2):
    return math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)

def Overlay(background, overlay, x, y, size):
    background_h, background_w, c = background.shape
    imgScale = mapFromTo(size, 200, 20, 1.5, 0.2)
    overlay = cv2.resize(overlay, (0, 0), fx=imgScale, fy=imgScale)
    h, w, c = overlay.shape
    try:
        if x + w/2 >= background_w or y + h/2 >= background_h or x - w/2 <= 0 or y - h/2 <= 0:
            return background
        else:
            overlayImage = overlay[..., :3]
            mask = overlay / 255.0
            background[int(y-h/2):int(y+h/2), int(x-w/2):int(x+w/2)] = (1-mask)*background[int(y-h/2):int(y+h/2), int(x-w/2):int(x+w/2)] + overlay
            return background
    except:
        return background

def mapFromTo(x,a,b,c,d):
    return (x-a)/(b-a)*(d-c)+c

def video_processing_dr():  
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    
    showShield = True
    changeTimer = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        print("yes")
        hands, img = detector.findHands(frame)
        final = frame

        if hands:
            success, shieldImage = shield.read()
            if not success:
                shield.set(cv2.CAP_PROP_POS_FRAMES, 0)
                success, shieldImage = shield.read()

        if len(hands) >= 1:
            for hand in hands:
                bbox = hand["bbox"]
                handSize = bbox[2]
                cx, cy = hand["center"]
                if 1 in detector.fingersUp(hand):
                    final = Overlay(img, shieldImage, cx, cy, handSize)

        cv2.imshow('DR', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def video_processing_dragon():
    
    cap = cv2.VideoCapture(0)
    detector = HandDetector(detectionCon=0.8, maxHands=1)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        hands, img = detector.findHands(frame)
        
        if hands:
            lmList = hands[0]
            fingerUp = detector.fingersUp(lmList)
            print(fingerUp)
            if sum(fingerUp) <= 2:
                count = "Finger Count: " + str(sum(fingerUp))
                cv2.putText(frame, count, (20, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
                cv2.putText(frame, "Running: ", (400, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)

            if sum(fingerUp) >= 3:
                count = "Finger Count: " + str(sum(fingerUp))
                cv2.putText(frame, count, (20, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
                cv2.putText(frame, "Jumping: ", (400, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
                pyautogui.press('space')
                print("Space key pressed")

        cv2.imshow('Dragon Jump', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def video_processing_hill_climb():
    cap = cv2.VideoCapture(0)
    detector = HandDetector(detectionCon=0.8, maxHands=2)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        h, w, c = frame.shape

        hands, img = detector.findHands(frame, draw=False)
        cv2.putText(frame, "GAS: ", (400, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
        cv2.putText(frame, "BRAKE: ", (20, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)

        # Variables to keep track if any hand satisfies the condition to press the keys
        left_hand_pressed = False
        right_hand_pressed = False

        if hands:
            for hand in hands:
                lmList = hand
                fingerUp = detector.fingersUp(lmList)

                if lmList['type'] == 'Left' and sum(fingerUp) >= 2:
                    print("GAS  ", lmList['type'])
                    cv2.putText(frame, "GAS: ", (400, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 1, cv2.LINE_AA)
                    pyautogui.keyDown('right')
                    # pyautogui.keyUp('left')
                    left_hand_pressed = True
                elif lmList['type'] == 'Right' and sum(fingerUp) >= 2:
                    print("BRAKE  ", lmList['type'])
                    cv2.putText(frame, "BRAKE: ", (20, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 1, cv2.LINE_AA)
                    pyautogui.keyDown('left')
                    # pyautogui.keyUp('right')
                    right_hand_pressed = True

        # Release both keys if neither hand satisfied the condition to press the keys
        if not left_hand_pressed:
            pyautogui.keyUp('left')
        if not right_hand_pressed:
            pyautogui.keyUp('right')

        cv2.imshow('Hill Climbing', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def video_processing_traffic_racer():
    cap = cv2.VideoCapture(0)
    detector = HandDetector(detectionCon=0.8, maxHands=2)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        h, w, c = frame.shape

        hands, img = detector.findHands(frame, draw=False)
        cv2.putText(frame, "-->", (500, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
        cv2.putText(frame, "<--", (20, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)

        # Variables to keep track if any hand satisfies the condition to press the keys
        left_hand_pressed = False
        right_hand_pressed = False

        if hands:
            for hand in hands:
                lmList = hand
                fingerUp = detector.fingersUp(lmList)

                if lmList['type'] == 'Left' and sum(fingerUp) >= 2:
                    print(lmList['type'])
                    cv2.putText(frame, "-->", (500, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 5, cv2.LINE_AA)
                    pyautogui.keyDown('right')
                    # pyautogui.keyUp('left')
                    left_hand_pressed = True
                elif lmList['type'] == 'Right' and sum(fingerUp) >= 2:
                    print(lmList['type'])
                    cv2.putText(frame, "<--", (20, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 5, cv2.LINE_AA)
                    # pyautogui.keyDown('left')
                    try:
                        pyautogui.keyDown('left')
                    except pyautogui.FailSafeException:
                        pass
                    # pyautogui.keyUp('right')
                    right_hand_pressed = True

        # Release both keys if neither hand satisfied the condition to press the keys
        if not left_hand_pressed:
            pyautogui.keyUp('left')
        if not right_hand_pressed:
            pyautogui.keyUp('right')

        cv2.imshow('Traffic Racer', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def video_processing_moto():
    detector = HandDetector(detectionCon=0.8, maxHands=1)
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        hands, img = detector.findHands(frame)

        if hands:
            lmList = hands[0]
            fingerUp = detector.fingersUp(lmList)
            print(fingerUp)

            if sum(fingerUp) >= 3:
                cv2.putText(frame, "Race: ", (400, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
                pyautogui.keyDown('w')
            if 1<= sum(fingerUp) <= 2:
                cv2.putText(frame, "Race: ", (400, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
                pyautogui.keyDown('a')

        cv2.imshow('Moto', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def video_processing_subway_surfer():
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)

    detector = HandDetector(detectionCon=0.8, maxHands=2)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        h, w, c = frame.shape

        hands, img = detector.findHands(frame)
        
        #Top
        cv2.rectangle(frame, (600,100),(700,200),(255, 0, 255), 2)
        cv2.putText(frame,"Top",(600,100),cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 2, cv2.LINE_AA)

        #Bottom
        cv2.rectangle(frame, (600,500),(700,600),(255, 0, 255), 2)
        cv2.putText(frame,"Bottom",(600,500),cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 2, cv2.LINE_AA)

        #Right
        cv2.rectangle(frame, (300,300),(400,400),(255, 0, 255), 2)
        cv2.putText(frame,"Right",(300,300),cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 2, cv2.LINE_AA)
        
        #Left
        cv2.rectangle(frame, (900,300),(1000,400),(255, 0, 255), 2)
        cv2.putText(frame,"Left",(900,300),cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 2, cv2.LINE_AA)
        
        if hands:
            for hand in hands:
            
                # print(hand)
                print(hand['center'])
                lmList = hand['center']
            
                
            #Top
                if (lmList[0]>=500 and lmList[0]<=700) and (lmList[1]>=100 and lmList[1]<=250):
                    print("top")
                    pyautogui.press('w')
                    

                #Bottom
                if (lmList[0]>=500 and lmList[0]<=700) and (lmList[1]>=500 and lmList[1]<=600):
                    print("Bottom")
                    pyautogui.press('s')
                    
                
                #Right
                if (lmList[0]>=300 and lmList[0]<=400) and (lmList[1]>=300 and lmList[1]<=400):
                    print("Right")
                    pyautogui.press('a')
                    
                
                #Left
                if (lmList[0]>=900 and lmList[0]<=1000) and (lmList[1]>=300 and lmList[1]<=400):
                    print("Left")
                    pyautogui.press('d')
                    


        cv2.imshow('Subway Surfers', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def video_processing_retro_highway():
    cap = cv2.VideoCapture(0)
    detector = HandDetector(detectionCon=0.8, maxHands=2)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        h, w, c = frame.shape

        hands, img = detector.findHands(frame, draw=False)
        cv2.putText(frame, "-->", (500, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)
        cv2.putText(frame, "<--", (20, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1, cv2.LINE_AA)

        # Variables to keep track if any hand satisfies the condition to press the keys
        left_hand_pressed = False
        right_hand_pressed = False

        if hands:
            for hand in hands:
                lmList = hand
                fingerUp = detector.fingersUp(lmList)

                if lmList['type'] == 'Left' and sum(fingerUp) >= 2:
                    print(lmList['type'])
                    cv2.putText(frame, "-->", (500, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 5, cv2.LINE_AA)
                    pyautogui.keyDown('right')
                    # pyautogui.keyUp('left')
                    left_hand_pressed = True
                elif lmList['type'] == 'Right' and sum(fingerUp) >= 2:
                    print(lmList['type'])
                    cv2.putText(frame, "<--", (20, 460), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 5, cv2.LINE_AA)
                    # pyautogui.keyDown('left')
                    try:
                        pyautogui.keyDown('left')
                    except pyautogui.FailSafeException:
                        pass
                    # pyautogui.keyUp('right')
                    right_hand_pressed = True

        # Release both keys if neither hand satisfied the condition to press the keys
        if not left_hand_pressed:
            pyautogui.keyUp('left')
        if not right_hand_pressed:
            pyautogui.keyUp('right')

        cv2.imshow('Retro Highway', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


def stop_processing_loop():
    global stop_processing
    stop_processing = True


@app.route('/api/dr', methods=['GET'])
def dr_route():
    Thread(target=stop_processing_loop).start()
    Thread(target=video_processing_dr).start()
    return jsonify({'message': 'DR route started'}), 200

@app.route('/api/dragon', methods=['GET'])
def dragon_route():
    Thread(target=stop_processing_loop).start()
    Thread(target=video_processing_dragon).start()
    return jsonify({'message': 'Dragon route started'}), 200

@app.route('/api/hill_climb', methods=['GET'])
def hill_climb_route():
    Thread(target=stop_processing_loop).start()
    Thread(target=video_processing_hill_climb).start()
    return jsonify({'message': 'Hill Climb route started'}), 200

@app.route('/api/traffic_racer', methods=['GET'])
def traffic_racer_route():
    Thread(target=stop_processing_loop).start()
    Thread(target=video_processing_traffic_racer).start()
    return jsonify({'message': 'Traffic Racer route started'}), 200

@app.route('/api/moto', methods=['GET'])
def moto_racer_route():
    Thread(target=stop_processing_loop).start()
    Thread(target=video_processing_moto).start()
    return jsonify({'message': 'Moto Racer route started'}), 200

@app.route('/api/subway_surfer', methods=['GET'])
def subway_surfer_racer_route():
    Thread(target=stop_processing_loop).start()
    Thread(target=video_processing_subway_surfer).start()
    return jsonify({'message': 'Subway Surfer route started'}), 200

@app.route('/api/retro_highway', methods=['GET'])
def retro_highway_route():
    Thread(target=stop_processing_loop).start()
    Thread(target=video_processing_retro_highway).start()
    return jsonify({'message': 'Retro Highway route started'}), 200

if __name__ == '__main__':
    app.run(debug=True)
