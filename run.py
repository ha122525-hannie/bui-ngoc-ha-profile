#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
=============================================================================
BÙI NGỌC HÀ - 1-CLICK AUTO LOCAL WEB SERVER
=============================================================================
Tự động kích hoạt Local Web Server và tự động mở trình duyệt mặc định.
Không yêu cầu cài thêm bất kỳ thư viện bên ngoài nào (dùng Python standard library).

Cách sử dụng:
    python3 run.py
hoặc:
    python run.py
=============================================================================
"""

import http.server
import socketserver
import webbrowser
import threading
import socket
import time
import sys
import os

# Định vị thư mục gốc của website (cùng thư mục với file run.py)
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(PROJECT_DIR)

DEFAULT_PORT = 8000
MAX_PORT_ATTEMPTS = 20

def is_port_in_use(port):
    """Kiểm tra xem cổng mạng có đang bị chiếm dụng bởi ứng dụng khác hay không."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def find_available_port(start_port):
    """Tự động tìm kiếm cổng còn trống."""
    port = start_port
    for _ in range(MAX_PORT_ATTEMPTS):
        if not is_port_in_use(port):
            return port
        port += 1
    return start_port

def open_browser(url, delay=0.6):
    """Mở trình duyệt sau khi máy chủ đã sẵn sàng lắng nghe kết nối."""
    time.sleep(delay)
    print(f"\n[+] Đang tự động mở trình duyệt tới: {url} ...")
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"[-] Không thể tự động mở trình duyệt ({e}), vui lòng mở thủ công: {url}")

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """Tùy chỉnh thông báo log để giao diện terminal luôn gọn gàng và đẹp mắt."""
    def log_message(self, format, *args):
        # In các yêu cầu tài nguyên dạng tinh gọn
        status_code = args[1] if len(args) > 1 else ""
        sys.stdout.write(f"\r  [⚡ Request] {args[0]} - Status: {status_code}\n")
        sys.stdout.flush()

def main():
    port = find_available_port(DEFAULT_PORT)
    url = f"http://localhost:{port}"

    # In banner khởi động ấn tượng
    banner = f"""
======================================================================
  🚀 BÙI NGỌC HÀ - STUDENT PROFILE LOCAL SERVER
======================================================================
  🎓 Sinh viên: BÙI NGỌC HÀ
  💻 Bài tập: Lập trình Web & Triển khai Git / GitHub
  🌐 Địa chỉ Web: \033[92m{url}\033[0m
  📁 Thư mục phục vụ: {PROJECT_DIR}
----------------------------------------------------------------------
  ✓ Python 3 HTTP Server đã sẵn sàng!
  ✓ Trình duyệt sẽ tự động bật lên trong giây lát...
  ⌨️  Nhấn \033[91mCtrl + C\033[0m để tắt server khi xong việc.
======================================================================
"""
    print(banner)

    # Chạy tiểu trình mở trình duyệt
    threading.Thread(target=open_browser, args=(url,), daemon=True).start()

    # Khởi động SocketServer
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", port), QuietHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n[🛑] Đã dừng server thành công. Tạm biệt thầy cô và các bạn!\n")
        sys.exit(0)
    except Exception as err:
        print(f"\n[-] Đã xảy ra lỗi: {err}")
        sys.exit(1)

if __name__ == "__main__":
    main()
