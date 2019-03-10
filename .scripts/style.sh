#!/bin/bash

if astyle --style=google --indent=spaces=4 --suffix=none --dry-run *.cpp *.h | grep Formatted;
then
    echo "CHECK FAIL"
    exit 1
fi

if astyle --style=google --indent=spaces=4 --suffix=none --dry-run *.h | grep Formatted;
then
    echo "CHECK FAIL"
    exit 1
fi
