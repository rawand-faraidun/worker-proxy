// append headers
export const appendHeaders: Record<string, string> = {
  // 'Access-Control-Allow-Origin': '*'
}

// clone headers
export const cloneHeaders: Record<string, string> = {
  // accept: 'user-accept'
}

// delete headers
export const removeHeaders = ['cf-connecting-ip', 'cf-ipcountry', 'cf-ray', 'cf-visitor', 'cf-worker', 'host']
