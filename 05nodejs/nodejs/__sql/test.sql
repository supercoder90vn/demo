SELECT People.ID, Firstname, Lastname, Address
FROM People INNER JOIN personaddresses 
ON People.ID = PersonAddresses.PersonID
INNER JOIN Addresses ON
PersonAddresses.AddressID = Addresses.ID;

select * from people;
select * from addresses;
select * from personaddresses;

SELECT People.ID, Firstname, Lastname, Address FROM People INNER JOIN personaddresses ON People.ID = PersonAddresses.PersonID INNER JOIN Addresses ON PersonAddresses.AddressID = Addresses.ID