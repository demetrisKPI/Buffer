'use strict';

function Buffer() {
  this.capacity = 'none';
  throw new Error('Cannot create an instance of an abtract class');
}

Buffer.prototype.add = function() {};
Buffer.prototype.remove = function() {};
Buffer.prototype.pop = function() {};
Buffer.prototype.search = function() {};
Buffer.prototype.cleanse = function() {};
Buffer.prototype.show = function() {};

function ArrBuffer(capacity) {
  this.msg = 'Unable to perform this operation';
  this.capacity = capacity;
  this.bank = [];
}

ArrBuffer.prototype = Object.create(Buffer.prototype);
ArrBuffer.prototype.constructor = ArrBuffer;

ArrBuffer.prototype.add = function(value) {
  if (this.bank.length === this.capacity) this.bank.pop();
  this.bank.unshift(value);
};

ArrBuffer.prototype.remove = function(pos) {
  if (pos < 1 || pos > this.bank.length) throw new Error(this.msg);
  this.bank.splice(pos - 1, 1);
};

ArrBuffer.prototype.pop = function() {
  if (!this.bank.length) throw new Error(this.msg);
  this.bank.pop();
};

ArrBuffer.prototype.search = function(pos) {
  if (!this.bank.length) throw new Error(this.msg);
  if (this.bank[pos - 1]) return this.bank[pos - 1];
  else console.log('No element found');
};

ArrBuffer.prototype.cleanse = function() {
  this.bank = [];
  console.log('Buffer is empty');
};

ArrBuffer.prototype.show = function() {
  for (let i = 0; i < this.bank.length; i++)
    console.log((i + 1) + ': ' + this.bank[i]);
};

const arrbuff = new ArrBuffer(6);

for (let i = 1; i < arrbuff.capacity + 1; i++) arrbuff.add(i);

arrbuff.add(54);
arrbuff.add(53);
arrbuff.add(42);

arrbuff.show();
arrbuff.pop();
arrbuff.remove(2);
console.log(arrbuff.search(3));
arrbuff.show();
arrbuff.cleanse();
arrbuff.show();

function Node(value) {
  this.data = value;
  this.prev = this.next = null;
}

function ListBuffer(capacity) {
  this.msg = 'Unable to perform this operation';
  this.capacity = capacity;
  this.length = 0;
  this.head = this.tail = null;
}

ListBuffer.prototype = Object.create(Buffer.prototype);
ListBuffer.prototype.constructor = ListBuffer;

ListBuffer.prototype.add = function(value) {
  const node = new Node(value);
  if (this.length === this.capacity) {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
    this.tail = this.tail.prev;
    this.tail.next = null;
  } else if (this.length) {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
    this.length++;
  } else {
    this.head = node;
    this.tail = node;
    this.length++;
  }
  return node;
};

ListBuffer.prototype.remove = function(pos) {
  let cur = this.head, count = 1;
  if (this.length === 0 || pos < 1 || pos > this.length) {
    throw new Error(this.msg);
  }
  if (pos === 1) {
    this.head = cur.next;
    if (!this.head) this.head.prev = null;
    else this.tail = null;
  } else if (pos === this.length) {
    this.tail = this.tail.prev;
    this.tail.next = null;
  } else {
    while (count < pos) {
      cur = cur.next;
      count++;
    }
    cur.prev.next = cur.next;
    cur.next.prev = cur.prev;
    cur = null;
  }
  this.length--;
};

ListBuffer.prototype.pop = function() {
  if (this.length === 0) throw new Error(this.msg);
  this.tail = this.tail.prev;
  this.tail.next = null;
  this.length--;
};

ListBuffer.prototype.search = function(pos) {
  let cur = this.head, count = 1;
  if (!this.length || pos < 1 || pos > this.length) {
    throw new Error(this.msg);
  }
  while (count < pos) {
    cur = cur.next;
    count++;
  }
  return cur.data;
};

ListBuffer.prototype.cleanse = function() {
  while (this.head) {
    if (!this.head.next) {
      this.head = null;
      break;
    }
    this.head = this.head.next;
    this.head.prev = null;
  }
  console.log('Buffer is empty');
};

ListBuffer.prototype.show = function() {
  if (this.head) {
    let cur = this.head, i = 1;
    while (i <= this.length) {
      console.log(i + ': ' + cur.data);
      cur = cur.next;
      i++;
    }
  }
};

const listbuff = new ListBuffer(6);

for (let i = 1; i < listbuff.capacity + 1; i++) listbuff.add(i);

listbuff.add(54);
listbuff.add(53);
listbuff.add(42);

listbuff.show();
listbuff.pop();
listbuff.remove(2);
console.log(listbuff.search(3));
listbuff.show();
listbuff.cleanse();
listbuff.show();
