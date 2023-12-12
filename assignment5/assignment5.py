import random
# Part A
myList = [1, 2, 3, 4]
myList2 = myList[1:]
myList2.append(5)
del myList2[2]
myList3 = myList2[:]

# Part B
def is_prime(number):
    if number <= 1:
        return False
    if number <= 3:
        return True
    if number % 2 == 0 or number % 3 == 0:
        return False
    i = 5
    while i * i <= number:
        if number % i == 0 or number % (i + 2) == 0:
            return False
        i += 6
    return True

def test_is_prime_with_random_numbers():
    num_tests = 10  # Number of random tests

    for _ in range(num_tests):
        random_number = random.randint(1, 100)  # Generate a random number between 1 and 100
        is_prime_result = is_prime(random_number)
        prime_status = "Prime" if is_prime_result else "Not Prime"
        print(f"{random_number} is {prime_status}")
test_is_prime_with_random_numbers()
# Part C
def disStuInfo(schoolID, *firstNames, **lastEmails):
    for firstName in firstNames:
        print(schoolID)
        print(firstName)
        print(lastEmails.get(firstName, "'N/A'"))

# Testing Part C
disStuInfo(10001, 'John', 'Petter', Smith='jSmith@gmail.com', Potter='Petter@yahoo.com', JackLast='j@gmail.com')
