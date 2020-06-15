# eufy-robovac
NodeJS library to control Eufy RoboVac. This library relies heavily on [TuyAPI](https://github.com/codetheweb/tuyapi) for communicating with the RoboVac and would not be possible without the [eufy_robovac](https://github.com/mitchellrj/eufy_robovac) repo by [mitchellrj](https://github.com/mitchellrj) as reference.


## Required Information

* RoboVac Device Id
* RoboVac localKey

You can get both pieces of information by using logcat to "sniff" the data on an android phone OR emulator.
This is known to work on [Eufy Home v2.3.2](https://www.apkmirror.com/apk/anker/eufyhome/eufyhome-2-3-2-release/eufyhome-2-3-2-android-apk-download/) (click the link to download the apk)

> More detailed steps on using logcat:
  
>  1. Close the app on your mobile device
>  2. Connect the device to your laptop and enable USB debugging
>  3. Run adb logcat -e 'tuya.m.my.group.device.list' (assumes you have already installed the Android debug tools)
>  4. Launch the Eufy Home app
>  5. The output lines contain JSON, you're looking for the values of localKey (16 character hex string) and devId (20 character hex string).

HUGE THANKS to [mitchellrj](https://github.com/mitchellrj) for [figuring this out](https://github.com/google/python-lakeside/issues/16#issuecomment-484792907)!

I had to use `adb shell logcat -e 'tuya.m.my.group.device.list'` on my Mac running BlueStacks emulator to get it to work but your mileage may vary. You may also not need to run BlueStacks but it was the easiest method for me. I installed the [EufyHome](https://play.google.com/store/apps/details?id=com.eufylife.smarthome) into the emulator and logged in and was able to grab my id/key.


## Demo

To test out if this library can talk to your RoboVac follow the steps below:

```
git clone git@github.com:joshstrange/eufy-robovac.git
cd eufy-robovac
npm install
npm run demo <deviceId> <localKey> <command>
```

Where command is either "quickTest" or "status". The `quickTest` command will:

* Connect to your device
* Print out the current statuses
* Start cleaning
* Wait 10 seconds
* Pause cleaning
* Wait 1 second
* Send device home
* Wait 1 second
* Disconnect & exit

The `status` command will simply print out the current statues and exit.

**NOTE: There is a decent amount of console.logs scattered around for debugging purposes that I haven't cleaned up yet so it might be a little... louder than you want**

I'm open to pull requests and I hope to use this library to implement a HomeBridge plugin in the near future. If you have any questions open an issue and I'll try my best to help.

I have published this on npm:

```
npm install --save eufy-robovac
```

I will try to keep the npm package updated. Also the type definitions for TypeScript are included.

## Development

This library is written in TypeScript. You should just need to run `npm run build` after making changes in the `src/` directory.
