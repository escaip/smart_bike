String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);}

const deviceFunctions={
    checkBluetooth: function(){
        ble.isEnabled("",
                      function(){
            deviceFunctions.showButton()
            deviceWaiting.waitingForBluetooth()
        })
    },
    stringToArrayBuffer:function(str) {
        let ret = new Uint8Array(str.length)
        for (let i = 0; i < str.length; i++) {
            ret[i] = str.charCodeAt(i)
        }
        return ret.buffer
    },
    //    showDebug:function(text) {
    //        $("#debug").text(text)
    //    },
    showCurrentState:function(text) {
        $("#currentState").text(text)
    },

    bytesToString:function(buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer))
    },

    showButton:function(){
        $("#bluetoothScreen").show()
        $("#toggleScreen").hide() 
        $("#statsScreen").hide()
        $("#acelScreen").hide()
        $("#lightScreen").hide()
        $("#locationScreen").hide()
        $("#weatherScreen").hide()
        $("#mapScreen").hide()

    },
    showToggle:function(){
        $("#bluetoothScreen").hide()
        $("#toggleServer").val("off").slider("refresh")
        $("#toggleScreen").show()
        $("#statsScreen").hide()
        $("#acelScreen").hide()
        $("#lightScreen").hide()
        $("#mapScreen").hide()
        $("#locationScreen").hide()
        $("#weatherScreen").hide()

    },


    showEverything: function() {
        $("#bluetoothScreen").hide()

        $("#statsScreen").show()
        $("#lightScreen").show()
        $("#locationScreen").show()
        $("#acelScreen").show()
        $("#mapScreen").show()
        $("#weatherScreen").show()



        const lightUuid =  bleIds.get('LIGHT_CH').uuid
        let data = ["0","0"]
        $("#lightToggler").change(() => {
            data[1] = ($("#lightToggler").val() == "on" ? "1" : "0")

            ble.write(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, lightUuid, arrayToArrayBuffer(data))
            alert(data)

        })
        $("#autoToggler").change(() => {
            data[0] = ($("#lightToggler").val() == "on" ? "1" : "0")
            ble.write(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, lightUuid, arrayToArrayBuffer(data))
        })

        let targetSpeed="24.5";
        let avgspeed="15";
        let distance="45";
        let message="Hello world";


        deviceLocation.getLocation()

        //        ble.write(deviceConnecting.connectedPeripheral.id,bleIds.get('SERVICE').uuid,bleIds.get('TEST_CH').uuid,deviceFunctions.stringToArrayBuffer(message));
        //
        //        ble.read(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, bleIds.get('TEST_CH').uuid, (valueArrBuf) => {
        //            targetSpeed = deviceFunctions.bytesToString(valueArrBuf)
        //        });
        //ble.notify(app.connectedPeripheral.id, bleIds.get('SERVICE').uuid, bleIds.get('SERVICE').uuid, app.onData);


        $("#speedCell").text(targetSpeed+" km/h")
        $("#avgspeedCell").text(avgspeed+" km/h")
        $("#distanceCell").text(distance+" km")
        $("#speedLabel").text("Speed")
        $("#avgspeedLabel").text("Avg speed")
        $("#distanceLabel").text("Distance")



        let canvasId="canvasId";
        let doAnimation=false;
        drawSpeedometer(targetSpeed, canvasId, doAnimation);




    }
}


