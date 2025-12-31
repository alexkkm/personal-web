// TOTP Calculation Module

function hexToBytes(hex) {
    let bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substring(i, i + 2), 16));
    }
    return bytes;
}
  
function base32Decode(encoded) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      let padding = 0;
      if (encoded.endsWith("=")) {
          padding = encoded.length - encoded.indexOf("=");
          encoded = encoded.substring(0, encoded.indexOf("="));
      }
  
      encoded = encoded.toUpperCase();
  
      let binaryString = "";
      for (let i = 0; i < encoded.length; i++) {
          const char = encoded[i];
          const index = alphabet.indexOf(char);
          if (index === -1) {
              throw new Error("Invalid Base32 character: " + char);
          }
          binaryString += index.toString(2).padStart(5, "0");
      }
  
      let result = [];
      for (let i = 0; i < binaryString.length; i += 8) {
          const byte = binaryString.substring(i, i + 8);
          if (byte.length === 8) {
              result.push(parseInt(byte, 2));
          }
      }
  
      return result;
}

/* */

// Placeholder - Replace with actual SHA1 implementationjavascript

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Yvan Boily, Steve Sanbeg,
 * Lawrence Brown.
 *
 * MIT License
 *
 * Based on sha1.js from http://pajhome.org.uk/crypt/md5/sha1.html
 */

function sha1(msg) {

    function rotate_left(n,s) {
      var t4 = ( n<<s ) | (n>>>(32-s));
      return t4;
    };
  
    function lsb_hex(val) {
      var str="";
      var i;
      var vh;
      var vl;
  
      for( i=0; i<=6; i+=2 ) {
        vh = (val>>>(i*4)) & 0x0f;
        vl = (val>>((i*4)+4)) & 0x0f;
        str += vh.toString(16) + vl.toString(16);
      }
      return str;
    };
  
    function cvt_hex(val) {
      var str="";
      var i;
      var v;
  
      for( i=7; i>=0; i-- ) {
        v = (val>>>(i*4)) & 0x0f;
        str += v.toString(16);
      }
      return str;
    };
  
  
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
  
    // utf-8 encode
    msg = Utf8Encode(msg);
  
    var msg_len = msg.length;
  
    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
      j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
      msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
      word_array.push( j );
    }
  
    switch( msg_len % 4 ) {
      case 0:
        i = 0x080000000;
      break;
      case 1:
        i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
      break;
  
      case 2:
        i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
      break;
  
      case 3:
        i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
      break;
    }
  
    word_array.push( i );
  
    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
  
    word_array.push( msg_len >>> 29 );
    word_array.push( (msg_len<<3) & 0x0ffffffff );
  
  
    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
  
      for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
      for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
  
      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;
  
      for( i=0; i<=19; i++ ) {
        temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }
  
      for( i=20; i<=39; i++ ) {
        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }
  
      for( i=40; i<=59; i++ ) {
        temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }
  
      for( i=60; i<=79; i++ ) {
        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B,30);
        B = A;
        A = temp;
      }
  
      H0 = (H0 + A) & 0x0ffffffff;
      H1 = (H1 + B) & 0x0ffffffff;
      H2 = (H2 + C) & 0x0ffffffff;
      H3 = (H3 + D) & 0x0ffffffff;
      H4 = (H4 + E) & 0x0ffffffff;
  
    }
  
    temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
  
  }
  
  function Utf8Encode(string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";
  
      for (var n = 0; n < string.length; n++) {
          var charcode = string.charCodeAt(n);
  
          if (charcode < 128) {
              utftext += String.fromCharCode(charcode);
          }
          else if((charcode > 127) && (charcode < 2048)) {
              utftext += String.fromCharCode((charcode >> 6) | 192);
              utftext += String.fromCharCode((charcode & 63) | 128);
          }
          else {
              utftext += String.fromCharCode((charcode >> 12) | 224);
              utftext += String.fromCharCode(((charcode >> 6) & 63) | 128);
              utftext += String.fromCharCode((charcode & 63) | 128);
          }
      }
  
      return utftext;
  }
  
function hmacSha1(key, message) {
    const blockSize = 64; // Block size for SHA1
    if (key.length > blockSize) {
      key = sha1(key); // If key is longer than block size, hash it
    }
  
    if (key.length < blockSize) {
      key = key.toString().padEnd(blockSize, '\0'); // Pad key to block size with zeros
    }
  
    const o_key_pad = xor(key, Array(blockSize).fill(0x5c).map(x => String.fromCharCode(x)).join(""));
    const i_key_pad = xor(key, Array(blockSize).fill(0x36).map(x => String.fromCharCode(x)).join(""));
  
    const inner_hash = sha1(i_key_pad + message);
    const hmac = sha1(o_key_pad + inner_hash);
  
    return hmac;
}
  
function xor(a, b) {
    let result = "";
    for (let i = 0; i < a.length; i++) {
      result += String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i));
    }
    return result;
}

// Output function
function totp(secret, timeStep = 30, digits = 6) {
    const time = Math.floor(Date.now() / 1000 / timeStep); // Current time step
    const timeHex = time.toString(16).padStart(16, '0'); // Convert to hex and pad
    const timeBytes = hexToBytes(timeHex).reverse(); // Convert hex to bytes (big-endian)
  
    const hmac = hmacSha1(base32Decode(secret), String.fromCharCode(...timeBytes)); // HMAC calculation
  
    const offset = hmac.charCodeAt(hmac.length - 1) & 0x0f; // Dynamic truncation
    const binaryCode =
      ((hmac.charCodeAt(offset) & 0x7f) << 24) |
      ((hmac.charCodeAt(offset + 1) & 0xff) << 16) |
      ((hmac.charCodeAt(offset + 2) & 0xff) << 8) |
      (hmac.charCodeAt(offset + 3) & 0xff);
  
    const otp = binaryCode % Math.pow(10, digits); // OTP value
    return otp.toString().padStart(digits, '0'); // Format to specified digits
}

export default totp;