#!/usr/bin/env python

# list of packages that should be imported for this code to work
import cobra.mit.access
import cobra.mit.request
import cobra.mit.session
import cobra.model.fv
import cobra.model.pol
from cobra.internal.codec.xmlcodec import toXMLStr
from credentials import *

# configuration variables
tenant = 'Heroes'
bridge_domain = 'Hero_Land'
application = 'Save_The_Network'
vlan1 = 'vlan-211'
vlan2 = 'vlan-212'
vlan3 = 'vlan-210'
