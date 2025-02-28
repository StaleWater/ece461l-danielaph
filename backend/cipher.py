# Task 1
def encrypt(inputText, N, D):
    ciphertext = ""
    inputText = inputText[::-1]
    
    for i in inputText:
        char = ord(i)
        if char == 32 or char == 33:
            ciphertext += chr(char)
        else:
            ciphertext += chr(((char - 34 + (N * D)) % (126 - 34 + 1)) + 34)

    return ciphertext

# Task 2
def decrypt(ciphertext, N, D):
    inputText = ""
    ciphertext = ciphertext[::-1]

    for i in ciphertext:
        char = ord(i)
        if char == 32 or char == 33:
            inputText += chr(char)
        else:
            inputText += chr(((char - 34 - (N * D)) % (126 - 34 + 1)) + 34)

    return inputText

def main():
    print(encrypt("TEST", 2, 1))

if __name__ == "__main__":
    main()