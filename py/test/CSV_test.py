#!/usr/bin/python
# coding=utf-8

import csv


with open('professorsTEST.csv', 'rb') as csvfile:
    testReader = csv.reader(csvfile, skipinitialspace=False, delimiter=',')
    t = list(testReader)
   
    for row in t[1:]:
        print row
        for i in row:
            print i

    # Print a specific row
    # print t[1]

    # Start index from 1
    # for index, item in enumerate(t, start=1):
    #     print(index, item)

    # Print all row
    # for row in testReader:
        # print ', '.join(row)