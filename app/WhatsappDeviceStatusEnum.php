<?php

namespace App;

enum WhatsappDeviceStatusEnum : int
{
    Case::NOT_CONNECTED =0;
    Case::CONNECTED =1;
    Case::BAD_SESSION =500;
    Case::CONNECTION_CLOSE =428;
    Case::CONNECTION_REPLACED =440;
    Case::FORBIDDEN =403;
    Case::LOGGED_OUT =401;
    Case::MULTDEVICE_MISSMATCH =411;
    Case::RESTART_REQUIRED =408;
    Case::UNAVAILABLE_SERVICE =503;
    
}
