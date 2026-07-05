#!/bin/zsh
set -u
SCRIPT_DIR="${0:A:h}"
CONTENTS_DIR="${SCRIPT_DIR:h}"
SITE_DIR="${CONTENTS_DIR}/Resources/site"
PORT="41731"
URL="http://127.0.0.1:${PORT}/?v=$(date +%s)"
APP_SUPPORT="${HOME}/Library/Application Support/小猫伸展提醒器"
LOG_DIR="${HOME}/Library/Logs"
LOG_FILE="${LOG_DIR}/小猫伸展提醒器.log"
PID_FILE="${APP_SUPPORT}/server.pid"
/bin/mkdir -p "${APP_SUPPORT}" "${LOG_DIR}"
if ! /usr/sbin/lsof -nP -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  nohup /usr/bin/python3 -m http.server "${PORT}" --bind 127.0.0.1 --directory "${SITE_DIR}" >>"${LOG_FILE}" 2>&1 &
  echo $! >"${PID_FILE}"
fi
for _ in {1..30}; do
  if /usr/bin/curl --silent --fail "${URL}" >/dev/null 2>&1; then
    break
  fi
  sleep 0.2
done
/usr/bin/open "${URL}"
