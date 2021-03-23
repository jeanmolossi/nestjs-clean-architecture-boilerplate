#!/usr/bin/env bash

readonly SRC_PATH="src"

readonly DOMAIN_DIRECTORY_PATH="${SRC_PATH}/core/domain"
readonly USE_CASES_DIRECTORY_PATH="${SRC_PATH}/core/domain/**/usecase"

readonly UNAUTHORIZED_IMPORTS_IN_USE_CASES="infrastructure|nestjs|application"
readonly UNAUTHORIZED_IMPORTS_IN_DOMAIN="${UNAUTHORIZED_IMPORTS_IN_USE_CASES}"

readonly UNAUTHORIZED_IMPORTS_COUNT_IN_DOMAIN=$(find ${DOMAIN_DIRECTORY_PATH} -name "*.ts" -exec egrep -w ${UNAUTHORIZED_IMPORTS_IN_DOMAIN} {} \; | wc -l)
readonly UNAUTHORIZED_IMPORTS_COUNT_IN_USE_CASES=$(find ${USE_CASES_DIRECTORY_PATH} -name "*.ts" -exec egrep -w ${UNAUTHORIZED_IMPORTS_IN_USE_CASES} {} \; | wc -l)

if [[ "${UNAUTHORIZED_IMPORTS_COUNT_IN_DOMAIN}" -eq 0 ]] && [[ "${UNAUTHORIZED_IMPORTS_COUNT_IN_USE_CASES}" -eq 0 ]]; then
  echo -e "\033[1;32mBoa garoto! Mantendo o padrão!"
  exit 0
fi

echo -e "\033[1;31m${UNAUTHORIZED_IMPORTS_COUNT_IN_DOMAIN} imports não permitidos em ${DOMAIN_DIRECTORY_PATH}:\033[1;33m"
find ${DOMAIN_DIRECTORY_PATH} -name "*.ts" -exec egrep -lw ${UNAUTHORIZED_IMPORTS_IN_DOMAIN} {} \;
echo ""
echo -e "\033[1;31m${UNAUTHORIZED_IMPORTS_COUNT_IN_USE_CASES} imports não permitidos em ${USE_CASES_DIRECTORY_PATH}:\033[1;33m"
find ${USE_CASES_DIRECTORY_PATH} -name "*.ts" -exec egrep -lw ${UNAUTHORIZED_IMPORTS_IN_USE_CASES} {} \;
exit 1
