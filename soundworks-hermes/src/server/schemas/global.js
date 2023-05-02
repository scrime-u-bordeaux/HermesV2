export default {
  // utility to avoid state update loops :
  // check who sent the message and ignore if self
  clientId: {
    type: 'float',
    default: -1,
  },
  // ---------------------------------------------------------------------------
  image1: {
    type: 'string',
    default: '',
    meta: {
      address: '/image_1',
    },
  },
  image1Visible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/image_1/visible',
    },
  },
  panel1Visible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/panel_1/visible',
    },
  },
  panel1Css: {
    type: 'string',
    default: '',
    meta: {
      address: '/panel_1/css',
    },
  },
  text1: {
    type: 'string',
    default: '',
    meta: {
      address: '/text_1',
    },
  },
  text2: {
    type: 'string',
    default: '',
    meta: {
      address: '/text_2',
    },
  },
  // Enc 1 ---------------------------------------------------------------------
  enc1: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc1',
    },
  },
  enc1Label: {
    type: 'string',
    default: '',
    meta: {
      address: '/Enc1/label',
    },
  },
  enc1Css: {
    type: 'string',
    default: '',
    meta: {
      address: '/Enc1/css',
    },
  },
  enc1Visible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc1/visible',
    },
  },
  // Enc 2 ---------------------------------------------------------------------
  enc2: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc2',
    },
  },
  enc2Label: {
    type: 'string',
    default: '',
    meta: {
      address: '/Enc2/label',
    },
  },
  enc2Css: {
    type: 'string',
    default: '',
    meta: {
      address: '/Enc2/css',
    },
  },
  enc2Visible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc2/visible',
    },
  },
  // Enc 3 ---------------------------------------------------------------------
  enc3: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc3',
    },
  },
  enc3Label: {
    type: 'string',
    default: '',
    meta: {
      address: '/Enc3/label',
    },
  },
  enc3Css: {
    type: 'string',
    default: '',
    meta: {
      address: '/Enc3/css',
    },
  },
  enc3Visible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc3/visible',
    },
  },
  // Enc 4 ---------------------------------------------------------------------
  enc4: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc4',
    },
  },
  enc4Label: {
    type: 'string',
    default: '',
    meta: {
      address: '/Enc4/label',
    },
  },
  enc4Css: {
    type: 'string',
    default: '',
    meta: {
      address: '/Enc4/css',
    },
  },
  enc4Visible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc4/visible',
    },
  },
  // Enc 1 s -------------------------------------------------------------------
  enc1s: {
    type: 'float',
    default: 0,
    meta: {
      address: '/Enc1_s',
    },
  },
  enc1sVisible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc1_s/visible',
    },
  },
  // Enc 2 s -------------------------------------------------------------------
  enc2s: {
    type: 'float',
    default: 0,
    meta: {
      address: '/Enc2_s',
    },
  },
  enc2sVisible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc2_s/visible',
    },
  },
  // Enc 3 s -------------------------------------------------------------------
  enc3s: {
    type: 'float',
    default: 0,
    meta: {
      address: '/Enc3_s',
    },
  },
  enc3sVisible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc3_s/visible',
    },
  },
  // Enc 4 s -------------------------------------------------------------------
  enc4s: {
    type: 'float',
    default: 0,
    meta: {
      address: '/Enc4_s',
    },
  },
  enc4sVisible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/Enc4_s/visible',
    },
  },
  // XY interaction ------------------------------------------------------------
  xy1: {
    type: 'any',
    default: [ 0.5, 0.5 ],
    meta: {
      address: '/xy_1'
    }
  },
  xy1Interaction: {
    type: 'boolean',
    default: true,
    meta: {
      address: '/xy_1/interaction'
    }
  },
  xy1Left: {
    type: 'float',
    default: 110,
    meta: {
      address: '/xy_1/left'
    }
  },
  xy1Visible: {
    type: 'boolean',
    default: false,
    meta: {
      address: '/xy_1/visible'
    }
  },
  // other ---------------------------------------------------------------------
  // pitch: {
  //   type: 'float',
  //   min: -12,
  //   max: 12,
  //   default: 0,

  // },
  // pitches: {
  //   type: 'any',
  //   default: [ 0, 0, 0, 0 ],
  // },
  // buttons: {
  //   type: 'any',
  //   default: 0,
  //   immediate: true,
  //   filterChange: false,
  // },
  // positions: {
  //   type: 'any',
  //   default: {},
  // },
};