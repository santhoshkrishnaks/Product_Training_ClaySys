using System;
using System.Collections.Generic;

namespace Generics
{
    class Stack<T>
    {
        List<T> element=new List<T>();
        
        public void Push(T element)
        {
            this.element.Insert(0, element);
        }
        public T Pop()
        {
                T num = element.ElementAt(0);
                this.element.Remove(element.ElementAt(0));
                return num;
        }
        public T Peek()
        {
            return element.ElementAt(0);
        }
        public override string ToString()
        {
            string a="";
            foreach (T item in element)
            {
                a += "" + item+"  ";
            }
            return a;
        }
    }
}
