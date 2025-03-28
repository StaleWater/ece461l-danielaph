def encrypt(inputText):
    return _encrypt(inputText, 4, 1)

def decrypt(inputText):
    return _decrypt(inputText, 4, 1)

def _encrypt(inputText, N, D):
    if N <= 0:
        raise ValueError("invalid shift value")
    if D != 1 and D != -1:
        raise ValueError("invalid direction value")

    rev = list(inputText[::-1])

    for i in range(len(rev)):
        num = ord(rev[i])
        if num >= 34:
            maxv = 127 - 34
            val = ( ((num - 34) + N * D + maxv) % (maxv) ) + 34
            rev[i] = chr(val)
    
    return "".join(rev)
            
def _decrypt(inputText, N, D):
    return _encrypt(inputText, N, -D)